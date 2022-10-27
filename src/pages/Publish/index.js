import {
  Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from 'react-router-dom'
import { http } from "@/utils/http";
import './index.scss'

// 富文本编辑器
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const { Option } = Select

const Publish = () => {

  const form = useRef(null);
  // 修改文章
  const [params] = useSearchParams()
  const articleId = params.get('id')

  useEffect(() => {
    async function getArticle() {
      const res = await http.get(`/mp/articles/${articleId}`)
      const { cover, ...formValue } = res.data
      // 动态设置表单数据
      form.setFieldsValue({ ...formValue, type: cover.type })
      // 格式化封面图片数据
      //const imageList = cover.images.map(url => ({ url }))
      //setFileList(imageList)
      //setMaxCount(cover.type)
      //fileListRef.current = imageList
    }
    if (articleId) {
      // 拉取数据回显
      getArticle()
    }
  }, [articleId])

  const onFinish = async (values) => {
    // 数据的二次处理 重点是处理cover字段
    console.log(values);
  }

  const [channels, setChannels] = useState([])
  useEffect(() => {
    async function fetchChannels() {
      const res = await http.get('/channels')
      setChannels(res.data.channels)
    }
    fetchChannels()
  }, [])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {articleId ? '修改文章' : '发布文章'}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ content: '' }}
          // 注意：此处需要为富文本编辑表示的 content 文章内容设置默认值
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 200 }}>
              {channels.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"

            />
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '修改文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish