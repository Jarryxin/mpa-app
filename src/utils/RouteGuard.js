import React, { useEffect, useState } from 'react'

// let promise = new Promise()

// function RouteGuard(props) {
//   const { component, ...rest } = props
//   const [isAuth, setIsAuth] = useState(false)
//   useEffect(() => {
//     new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(true)
//       }, 5000)
//     }).then((data) => {
//       setIsAuth(data)
//     })
//   })
//   return isAuth ? component(rest) : ''
//   // return isAuth ? <Comp {...rest} /> : ''
// }

class RouteGuard extends React.Component {
  state = {
    isAuth: false,
  }
  componentDidMount() {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 2000)
    }).then((data) => {
      this.setState({isAuth: data})
    })
  }

  render() {
    const { component, ...rest } = this.props
    const { isAuth } = this.state
    console.log("---")
    console.log(component)
    return (
      isAuth ? component(rest) : ''
    )
  }
}

export default RouteGuard
