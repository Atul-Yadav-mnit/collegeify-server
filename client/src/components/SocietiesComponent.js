import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../shared/baseURL'
import { useDispatch,useSelector } from 'react-redux'
import { FetchSocieties } from '../redux/societies/societiesActionCreater'
import { Loading } from './LoadingComponent'


const SocietyList = ({society}) => {
    return ( <div className="col-md-4 col-sm-4 col-xs-12 portfolio-item">
    <Link to={`/societies/${society._id}`} >
        <div className="single-awesome-project">
            <div className="awesome-img">
                <a href="#"><img src={baseUrl+society.image} alt="image" /></a>
                <div className="add-actions text-center">
                    <div className="project-dec">
                        <h4>{society.name}</h4>
                        <span>Mnit Jaipur</span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
</div>)
}





const SocietiesComponent = () => {

    
    const societies = useSelector(state => state.societies)
    // console.log("euhfds",societies)
    const dispatch = useDispatch()

    var display;

    useEffect(() => {
        //console.log("runnnnnn")
        dispatch(FetchSocieties())
    },[])

    if(societies.err != "")
    {
        display = <div>
            {societies.err}
        </div>
        
    }
    else if(societies.payload != '')
    {
        //console.log("helo",societies.payload)
        const society = societies.payload.map((society) => {
            return (
                <SocietyList society={society}  key={society.id}/>
            )
        })

       display = ( <div>
        {/* <!-- ======= Portfolio Section ======= --> */}
        <div id="portfolio" className="portfolio-area area-padding fix">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="section-headline text-center">
                            <h2>Societies</h2>
                        </div>
                    </div>
                </div>
                <div className="row awesome-project-content portfolio-container">
                    {society}
                </div>
            </div>
        </div>
        {/* <!-- End Portfolio Section --> */}
    </div>)     
    }
    else
    {
        display = (<div>
            <Loading/>
        </div>)
    }
   
    return <div>
        {display}
    </div>
    
}

export default SocietiesComponent
