import '@testing-library/jest-dom'

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LandingPage } from '@/app/components/LandingPage'
import { Cards } from '@/app/components/Cards';
import { Quiz } from '@/app/components/Quiz';
import { CreateQuestionsForm } from '@/app/components/Questions/CreateQuestionsForm';
import { EditQuestionsForm } from '@/app/components/Questions/EditQuestionsForm';
import { Result } from '@/app/components/Result';
import { Choices } from '@/app/components/Choices';
import { ProgressBar } from '@/app/components/ProgressBar';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}));

jest.mock('../app/lib/db', () => ({
  client: jest.fn().mockResolvedValue({}),
}));

jest.mock('../app/actions/actions', () => ({
  createQuestion: jest.fn(),
  deleteQuestion: jest.fn(),
  updateQuestion: jest.fn(),

}));


describe('Landing Page', () => {
  it('renders a heading', () => {
    render(<LandingPage />)
 
    const heading = screen.getByRole('heading', { name: /are you an introvert or an extrovert\?/i })
 
    expect(heading).toBeInTheDocument()
  })

  it('renders a paragraph', () => {
    render(<LandingPage />)
 
    const para = screen.getByText(/take this quiz to discover your personality type!/i)
 
    expect(para).toBeInTheDocument()
  })

  it('renders a link', () => {
    render(<LandingPage />)
 
    const link = screen.getByRole('link', { name: /start quiz/i }) 

    expect(link).toBeInTheDocument()
  })

  it('renders with href property equal to /quiz', async () => {
    render(<LandingPage />)

    const link = screen.getByRole('link', { name: /start quiz/i }) 

    expect(link).toHaveAttribute('href', '/quiz');
  })

  it('renders image with correct attributes', () => {
    const { getByAltText } = render(<LandingPage />);

    const imageElement = getByAltText('Avatar');

    expect(imageElement).toBeInTheDocument();

    expect(imageElement).toHaveAttribute('width', '400');
    expect(imageElement).toHaveAttribute('height', '400');
  });
})

describe('Questions', () => {

  it('renders card component', async () => {
    const response = await fetch('/questions');
  
    const quiz = await response.json()

    const {getAllByTestId} = render(<Cards quiz={quiz} />);
  
    const lists = getAllByTestId('list')
    expect(lists).toHaveLength(2)
  })

})

describe('Quiz',  () => {

  it('displays error toast when there are no questions', () => {
    const questions = [];

    render(<Quiz questions={questions} />);

    expect(toast.error).toHaveBeenCalledWith('No questions available!');
  });

  it('updates selected choices and next button disabled state correctly', async () => {
    const response = await fetch('/questions');
    const questions = await response.json();

    const { getByText, getByTestId, getByLabelText } = render(<Quiz questions={questions} />);

    const nextButton = getByTestId('next-button');

    expect(nextButton).toBeDisabled();

    fireEvent.click(getByLabelText('Nawal'));
    
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    fireEvent.click(getByLabelText('10+'));

    expect(getByTestId('submit-button')).not.toBeDisabled();

    expect(getByText('Back')).not.toBeDisabled();

    fireEvent.click(getByText('Back'));

    expect(nextButton).not.toBeDisabled();

    fireEvent.click(getByLabelText('Ali'));

    fireEvent.click(nextButton);

    expect(nextButton).not.toBeDisabled();


  });

  it('renders and completes the quiz flow', async () => {
      const handleSelectedChoices = jest.fn();
      
      const response = await fetch('/questions');
      
      const questions = await response.json();
      
      const selectedChoices = questions[0].choices[0];

      const { getByText, getByTestId, queryByTestId } = render(<Quiz questions={questions} />);
    
      const quizElement = getByTestId('quiz');
      expect(quizElement).toBeInTheDocument();

      // selects so that the button becomes enabled
      const { getByLabelText } = render(<Choices choices={questions[0].choices} selectedChoices={selectedChoices} handleSelectedChoices={handleSelectedChoices} />);

      fireEvent.click(getByLabelText('Nawal'));
      expect(queryByTestId('submit-button')).not.toBeInTheDocument();

      // navigates to next question
      fireEvent.click(getByText('Next'));

      const { getByLabelText: getBtn } = render(<Choices choices={questions[1].choices} selectedChoices={selectedChoices} handleSelectedChoices={handleSelectedChoices} />);
      
      const submitButton = getByTestId('submit-button');
      expect(submitButton).toBeDisabled();
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(getBtn('10+'));

      expect(submitButton).not.toBeDisabled();

      await waitFor(() => {
        const questionElement = getByText('What is your age?');
        expect(questionElement).toBeInTheDocument();
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        const resultElement = getByTestId('result');

        expect(resultElement).toBeInTheDocument();
      });

  })

  it('navigates to prev question correctly', async () => {
      const handleSelectedChoices = jest.fn();
      const response = await fetch('/questions');

      const questions = await response.json()

      const selectedChoices = questions[0].choices[0];

      const { getByText, getByTestId, queryByText } = render(<Quiz questions={questions} />);
    
      const quizElement = getByTestId('quiz');
      expect(quizElement).toBeInTheDocument();

      // selects so that the button becomes enabled
      const { getByLabelText } = render(<Choices choices={questions[0].choices} selectedChoices={selectedChoices} handleSelectedChoices={handleSelectedChoices} />);

      fireEvent.click(getByLabelText('Nawal'));

      fireEvent.click(getByText('Next'));
      
      await waitFor(() => {
        const questionElement = getByText('What is your age?');
        expect(questionElement).toBeInTheDocument();
      });

      fireEvent.click(getByText('Back'));

      await waitFor(() => {
        const questionElement = getByText('What is your name?');
        expect(questionElement).toBeInTheDocument();
      });

  })

  it('renders extrovert when score is greater than 0', () => {
    render(<Result score={1} />);
    const resultElement = screen.getByTestId('result');
    expect(resultElement).toHaveTextContent('You are an extrovert');
  });

  it('renders introvert when score is 0 or less', () => {
    render(<Result score={0} />);
    const resultElement = screen.getByTestId('result');
    expect(resultElement).toHaveTextContent('You are an introvert');

    render(<Result score={-1} />);
    expect(resultElement).toHaveTextContent('You are an introvert');
  });

  it('renders checkboxes for each choice', async () => {
    const response = await fetch('/questions');
      
    const questions = await response.json();

    const selectedChoices = questions[0].choices[0];

    const choices = questions[0].choices;

    const handleSelectedChoices = jest.fn();

    const { getByLabelText, getByTestId } = render(<Choices choices={choices} selectedChoices={selectedChoices} handleSelectedChoices={handleSelectedChoices} />);
    
    choices.forEach((choice, index) => {
      const label =  getByLabelText(choice.text)
      const choiceDiv = getByTestId(`choice-${index}`)
      expect(label).toBeInTheDocument();
      fireEvent.click(choiceDiv)
      expect(handleSelectedChoices).toHaveBeenCalled();
    });
  });

  it('selects choice', async () => {
    const handleSelectedChoices = jest.fn();

    const response = await fetch('/questions');
      
    const questions = await response.json()

    const selectedChoices = questions[0].choices[0];

    const choices = questions[0].choices;

    const { getByLabelText } = render(<Choices choices={choices} selectedChoices={selectedChoices} handleSelectedChoices={handleSelectedChoices} />);

    fireEvent.click(getByLabelText(choices[0].text));

    expect(handleSelectedChoices).toHaveBeenCalledWith(choices[0]);
  })

  it('calls handleSelectedChoices when Enter key is pressed', async () => {
    const handleSelectedChoices = jest.fn();
    const response = await fetch('/questions');
      
    const questions = await response.json()

    const selectedChoices = questions[0].choices[0];
    const { getByLabelText } = render(<Choices choices={questions[0].choices} selectedChoices={selectedChoices} handleSelectedChoices={handleSelectedChoices} />);


    fireEvent.keyDown(getByLabelText('Nawal'), { key: 'Enter', keyCode: 13 });

    expect(handleSelectedChoices).toHaveBeenCalledWith({ text: 'Nawal', weightage1: -1 });
  });

  it('ProgressBar displays correct progress percentage', () => {
    const progress = 50; 

    const { getByTestId } = render(<ProgressBar progress={progress} />);
    
    const progressBar = getByTestId('progress-bar');

    expect(progressBar).toBeInTheDocument();
    
    expect(progressBar).toHaveStyle(`width: ${progress}%`);
  });

})


describe('Create Question Form', () => {
  it('updates form state on input change', () => {
    const { getByPlaceholderText } = render(<CreateQuestionsForm />);
    const questionInput = getByPlaceholderText('Enter Question');

    fireEvent.change(questionInput, { target: { value: 'Test Question' } });

    expect(questionInput.value).toBe('Test Question');
  });
})

describe('EditQuestionsForm', () => {
  it('renders form with initial values', async () => {
    const response = await fetch('/questions');
      
    const questions = await response.json();
    render(<EditQuestionsForm question={questions[0]} />);
    
    const questionInput = screen.getByLabelText('Edit question');
    expect(questionInput).toBeInTheDocument();
    expect(questionInput).toHaveValue('What is your name?');

    const choiceInputs = screen.getAllByPlaceholderText('Enter choice');
    expect(choiceInputs).toHaveLength(4);
   

    const weightageInputs = screen.getAllByPlaceholderText('Weightage');
    expect(weightageInputs).toHaveLength(4);
    
  });

  it('updates question text on input change', async () => {
    const response = await fetch('/questions');
      
    const questions = await response.json();

    render(<EditQuestionsForm question={questions[0]} />);

    const questionInput = screen.getByLabelText('Edit question');
    fireEvent.change(questionInput, { target: { value: 'What is your favorite food?' } });

    expect(questionInput).toHaveValue('What is your favorite food?');
  });

});