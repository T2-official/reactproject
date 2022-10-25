import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
// historyrouter
import { HistoryRouter, history } from './utils/history'

// 导入页面组件
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
// 二级
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'


function App() {
  return (

    <HistoryRouter history={history}>
      {/* <BrowserRouter> */}
        <div className="App">
          <Routes>
            <Route path="/" element={
              <AuthRoute>
                <Layout />
                {/* childeren 传入 */}
              </AuthRoute>
            } >
              {/* 二级路由默认页面 */}
              <Route index element={<Home />} />
              <Route path="article" element={<Article />} />
              <Route path="publish" element={<Publish />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      {/* </BrowserRouter > */}
    </HistoryRouter>

  );
}

export default App;
