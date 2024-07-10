    const MIN = 0;
    const MAX = 100;

/**
 * ProgressBar component to show the progress of quiz.
 *
 * @component
 * @param {number} progress - Progress in percentage
 * 
 */

    export const ProgressBar = ({ progress } : { progress: number }) => {

        const clampedValue = Math.min(Math.max(progress, MIN), MAX);

        return ( 
            <div className="w-full bg-gray-200 rounded-full h-5 dark:bg-green-800">
                <div 
                    data-testid="progress-bar" 
                    className={` h-2.5 rounded-full h-5 text-white bg-gray-800 flex justify-center items-center`} 
                    style={{ width: progress + '%' }}
                    role="progressbar"
                    aria-valuenow={clampedValue}
                    aria-valuemin={MIN}
                    aria-valuemax={MAX}
                >
                    <p className="ml-10 text-white">{clampedValue}%</p>
                </div>
            </div>
        )

    }