import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import { establishments } from '../basestuff'

class Board extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    const items = [...establishments]
    return (
      <div className="container">
        <div className="row">
          <h3 className="">Machi Koro - New York City!</h3>
        </div>
          <div className="row">
            {items && items.map(item => (
              <div className="col-md-2 well itemcontainer" key={item.type}>
                <Link className="img-thumbnail itemcontainerthumbnail" to={'/items/' + item.id + '/reviews'}>
                </Link>
                <div className="">
                  <div className="itemcontainernamecont">
                    <h4 >
                      <span>
                        <Link to={'/items/' + item.id + '/reviews'}>{item.title}</Link>
                      </span>
                    </h4>
                    <div id="itemDetails">
                      {item.brand}
                    </div>
                    <div id="itemPrice">
                      {item.quantity > 0 ? <small>${item.price}</small> : <strong className="text-danger" >Out of Stock</strong>}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

      </div>


      )
  }
}
const mapStateToProps = (state) => ({

})



export default connect(mapStateToProps)(Board)
