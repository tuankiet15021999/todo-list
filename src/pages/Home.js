import React, {useState}  from 'react'
import CreateTodoModal from '../components/CreateTodoModal'
import DeteleModal from '../components/DeleteModal'
import Collapse from '../components/Collapse'
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
const Home = () => {
    const [listData, setListData] = useState(
    [{
        id:1,
        title: 'Housework',
        jobs:[
            {
                id:1,
                content: 'Dish washing',
                status:true
            },
            {
                id:2,
                content: 'Dump the trash',
                status:false
            },
            {
                id:3,
                content: 'Clean house',
                status:false
            },
        ]
    },
    {
        id:2,
        title: 'Do homework',
        jobs:[
            {
                id:1,
                content: 'Math',
                status:false
            },
            {
                id:2,
                content: 'English',
                status:false
            },
            {
                id:3,
                content: 'Chemistry',
                status:true
            },
        ]
    },
    {
        id:3,
        title: 'Go outside',
        jobs:[
            {
                id:1,
                content: 'Shopping',
                status:false
            },
            {
                id:2,
                content: 'Mall',
                status:false
            },
            {
                id:3,
                content: 'Park',
                status:false
            },
        ]
    }])
    const [isShowTodoModal, setIsShowTodoModal] = useState(false)
    const [isShowJobModal, setIsShowJobModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDeleteJobModal, setIsShowDeleteJobModal] = useState(false)
    const [todoData, setTodoData] = useState()
    const [jobData, setJobData] = useState()
    const showCreateTodoModal = (data) => (event) => {
        setTodoData(data)
        setIsShowTodoModal(!isShowTodoModal)
        event.preventDefault()
    }
    const showCreateJobModal = (todoData,jobData) => (event) => {
        setJobData(jobData)
        setTodoData(todoData)
        setIsShowJobModal(!isShowJobModal)
        event.preventDefault()
    }
    const showDeleteTodoModal = (data) => (event) => {
        setIsShowDeleteModal(!isShowDeleteModal)
        setTodoData(data)
        event.preventDefault()
    }
    const showDeleteJobModal = (todoData, jobData) => (event) => {
        setIsShowDeleteJobModal(!isShowDeleteJobModal)
        setTodoData(todoData)
        setJobData(jobData)
        event.preventDefault()
    }
    const handleDeleteTodo = (event) => {
       setListData(
            listData?.reduce((value,item)=>{
                if (item.id !== todoData.id) { value.push(item) } 
                return value
            },[])
        )
        setIsShowDeleteModal(false)
        setTodoData()
        event.preventDefault()
    }
    const handleDeleteJob = (event) => {
        console.log(todoData, jobData)
        setListData(
            listData?.map((data)=>{
                if (data.id === todoData.id) { 
                    data.jobs = data.jobs.reduce((value, item)=>{
                        if(item.id !== jobData.id) {
                            value.push(item)
                        }
                        return value
                    },[])
                } 
                return data
            })
         )
         console.log(listData)
         setIsShowDeleteJobModal(false)
         setTodoData()
         setJobData()
         event.preventDefault()
     }
    const handleCreateTodo = (title) => {
        if (todoData) {
            setListData(
                listData?.map((item)=>{
                    if (item.id === todoData.id) { item.title = title } 
                    return item
                })
            )
        } else {
            setListData([
                ...listData,
                {
                    id:parseInt(listData[listData.length-1]?.id)+1,
                    title
                }
            ])
        }
        setIsShowTodoModal(false)
        setTodoData()
    }
    const  handleCreateJob = (content) => {
        if(todoData) {
            if (jobData) {
                setListData(
                    listData?.map((data)=>{
                        if (data.id === todoData.id) {
                            data?.jobs?.map((item)=>{
                                if(item.id === jobData.id) {
                                    item.content = content
                                }
                            })
                        }
                        return data
                    })
                )
            } else {
                setListData(
                    listData?.map((data)=>{
                        if(data.id === todoData.id) {
                            data.jobs = [
                                ...data.jobs,
                                {
                                    id:parseInt(data.jobs[data?.jobs?.length-1]?.id)+1,
                                    content: content,
                                    status: false
                                }
                            ]
                        }
                        return data
                    })
                )
            }
        }
        setIsShowJobModal(false)
        setJobData()
        setTodoData()
    }
    const handleOnCancelToDoModal = () => {
        setIsShowTodoModal(false)
        setTodoData()
    }
    const handleOnCancelJobModal = () => {
        setIsShowJobModal(false)
        setJobData()
        setTodoData()
    }
    const handleChecked = (todoId, jobId) => (event) => {
        setListData(
            listData.map((todo)=>{
                if(todo.id === todoId) {
                    todo.jobs.map((job)=>{
                        if(job.id === jobId) {
                            job.status = event.target.checked
                        }
                    })
                }
                return todo
            })
        )
    }
    return (
    <>
        <div className="title-container">
            <div className="title background-content">
                <h1>Todo List</h1>
                <button className="button create-todo-btn" onClick={() => setIsShowTodoModal(true)}>+</button>
            </div>
        </div>
        <div className="body-container background-content">
            <ul>
                {listData.map((data, index)=>{
                    return (
                        <li className="list-container" key={index}>
                            <Collapse
                                title={
                                <>
                                    <p className="list-data" >{data.title}</p>
                                    <button onClick={showDeleteTodoModal(data)} className="button detele-todo-btn"><FaTrash/></button>
                                    <button onClick={showCreateTodoModal(data)} className="button edit-todo-btn"><FaPencilAlt/></button>
                                </>} 
                            >
                                    <table>
                                        <thead className="text-left">
                                            <tr>
                                                <th></th>
                                                <th>Content</th>
                                                <th className="text-center">Actions</th>
                                                <th className="text-right"><button onClick={showCreateJobModal(data)} className="button create-job-btn">+</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.jobs?.map((item, index) => {
                                                return (
                                                <tr key={item.id}>
                                                    <td><input onChange={handleChecked(data.id,item.id)} checked={item.status} type="checkbox"/></td>
                                                    <td>{item.content}</td>
                                                    <td className="text-right">
                                                        <button onClick={showCreateJobModal(data,item)} className="button edit-job-btn"><FaPencilAlt/></button>
                                                        <button onClick={showDeleteJobModal(data,item)} className="button detele-job-btn"><FaTrash/></button>
                                                    </td>
                                                </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                            </Collapse>
                        </li>
                    )
                })}
            </ul>
        </div>
        {   
            isShowTodoModal &&
             <CreateTodoModal 
                onCancel={handleOnCancelToDoModal} 
                onSubmit={handleCreateTodo}
                content={todoData?.title}
                isEdit = {todoData?.id}
            />
        }
        {
            isShowDeleteModal &&
            <DeteleModal
                onCancel={showDeleteTodoModal}
                onConfirm={handleDeleteTodo}
                content={todoData?.title}
            />
        }
        {
            isShowJobModal &&
            <CreateTodoModal
                onCancel={handleOnCancelJobModal}
                onSubmit={handleCreateJob}
                content={jobData?.content}
                isEdit = {jobData?.id}
            />
        }
        {
            isShowDeleteJobModal &&
            <DeteleModal
                onCancel={showDeleteJobModal}
                onConfirm={handleDeleteJob}
                content={jobData?.content}
            />
        }
    </>
    )
}
export default Home