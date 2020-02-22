import React, {useState} from 'react';
import { connect } from 'react-redux';

// function FormC(props) {
//   const [text, setText] = useState('')
//   console.log(text)
//   return <div>
//     <p>FormCxx??</p>
//     <input value={text} onChange={e => setText(e.target.value)}/>
//   </div>
// }

class FormC extends React.Component {
  state = {
    text: 'af'
  }
  render() {
    return <div>
      <p>FormCgy</p>
      <input value={this.state.text} onChange={e => this.setState({text: e.target.value})}/>
    </div>
  }
}

export default connect( state => state )(FormC);
