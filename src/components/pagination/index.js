
import "./index.css"

const Pagination=(props)=>{

    const {pageNumber,allData,changeToNextPage}=props

    const pages=[]

    for (let i=1;Math.ceil(allData.length/10)+1>i;i+=1){
        pages.push(i)
    }

    const changeNext=()=>{

        if(pageNumber<pages.length){
        
        changeToNextPage(pageNumber+1)

        }
    }

    const changePrevious=()=>{

        if(pageNumber>1){
            changeToNextPage(pageNumber-1)
        }

    }

    return(


        <div className="pagination-bg">

            <div>
                <p>page No: {pageNumber}</p>
            </div>

            <div>
                    <button className="previous" onClick={changePrevious}type="button">Previous</button>

                    &emsp;-&emsp;

                    <button className="next" onClick={changeNext}type="button">Next</button> 
                    
            </div>

            <div>
                <p>Per Page: 10</p>
            </div>
        </div>
    )

}

export default Pagination