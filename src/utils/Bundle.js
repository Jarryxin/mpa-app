// 该组件是为了异步加载js文件
import React from 'react'

const resolveModuleDefault = module => module.__esModule ? module.default : module

class Bundle extends React.Component {
  static async loadComponent(component) {
    const module = await component()
    return resolveModuleDefault(module)
  }

  constructor(props) {
    super(props)
    this.state = {
      mod: null,
      err: null,
    }
  }

  componentWillMount() {
    const {
      load: {
        component
      },
    } = this.props
    this.load(component)
  }

  componentWillReceiveProps(nextProps) {
    const { load } = this.props
    if (load !== nextProps.load) {
      const {
        component
      } = nextProps.load
      this.load(component)
    }
  }

  async load(component) {
    Bundle.loadComponent(component)
      .then(mod => this.setState({ mod }))
      .catch(err => this.setState({ err }))
  }

  render() {
    const { mod, err } = this.state
    const { children } = this.props
    if (mod !== null) {
      return children(mod)
    }
    if (err !== null) {
      return err
    }
    return ''
  }
}

export default Bundle
