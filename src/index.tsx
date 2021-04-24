import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import { HashRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
import { Header } from '@components'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
const store = {}
const App = () => (
  <HashRouter>
    {/* <Provider store={store}> */}
    <ConfigProvider locale={zhCN}>
      <Header />
    </ConfigProvider>
    {/* </Provider> */}
  </HashRouter>
)

ReactDOM.render(<App />, document.querySelector('#root'))
