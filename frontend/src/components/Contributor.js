import React from 'react';
import musaPic from '../assets/musaPic.jpg';
import shawnPic from '../assets/shawnPic.png';
import kenanPic from '../assets/kenanPic.jpeg';
import lucasPic from '../assets/musaPic.jpg';
import jackPic from '../assets/musaPic.jpg';
import './Contributor.css';

class Contributor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pics: [musaPic, shawnPic, kenanPic, lucasPic, jackPic]
        }
    }

    render(){
        const renderImage = ()=>{
            if(this.props.name === 'Musa Rafik'){
                return <img className="pic" alt="contributor headshot" src={musaPic} />
            }
            else if(this.props.name === 'Jack Diao'){
                return <img alt="contributor headshot" src={jackPic} className="pic"/>
            }
            else if(this.props.name === 'Kenan Hurd'){
                return <img alt="contributor headshot" src={kenanPic} className="pic" />
            }
            else if(this.props.name === 'Shawn Victor'){
                return <img alt="contributor headshot" src={shawnPic} className="pic" />
            }
            else if(this.props.name === 'Lucas Best'){
                return <img alt="contributor headshot" src={lucasPic} className="pic" />
            }
        }

        return(
            <div>
               {renderImage()}
                <h3>{this.props.name}</h3>

                <p>{this.props.major}</p>

                <p>{this.props.responsibilities}</p>

                <p>{this.props.commits} commits</p>

                <p>{this.props.issues} issues</p>
            </div>

        );
    }
}

export default Contributor;