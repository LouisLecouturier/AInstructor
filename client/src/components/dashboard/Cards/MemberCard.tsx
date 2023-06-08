import clsx from 'clsx'
import React from 'react'
import Delete from '@icons/Delete.svg'



const fetchData = async (modelFieldLine : Record<string, string|boolean>, modelPrimaryKey : string, urlDeleteLine : string) => {
        try {
          const response = await fetch(urlDeleteLine, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                modelPrimaryKey,
                modelFieldLine,

                
            }),
          });
          
        const responseData = await response.json();
        console.log(responseData);
        return responseData.error;
          
        } 
  
        catch (error) {
          console.error(error);
        }
      };
  


      

export default function Line(
        {
                modelFieldLine,
                modelPrimaryKey,
                urlDeleteLine,
        } : {
                modelFieldLine : Record<string, string|boolean>,
                modelPrimaryKey : string,
                urlDeleteLine : string,
        }
        ) {

        const [Display, setDisplay] = React.useState("");


        async function handleClick() {
                const error = await fetchData(modelFieldLine, modelPrimaryKey, urlDeleteLine);
                error ? setDisplay("") : setDisplay("hidden")
        }

        return (
                <div 
                className={clsx(
                        'flex flex-row justify-between items-center gap-8',
                        'w-full h-12 px-8 py-4',
                        'hover:bg-accent-50',
                        Display,
                )}>

                        <div className='flex flex-1 gap-4 '>       
                                {Object.entries(modelFieldLine).map(([key, value]) => (
                                        <span key={key} className="font-normal flex-1 text-sm">{String(value)}</span>
                                ))}
                        </div>


                        <div onClick={handleClick} className='flex justify-end'>
                                <Delete className='w-6 hover:text-accent-500'/>
                        </div>
                </div>
  )
}