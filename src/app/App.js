import React, { Component } from 'react'
import { ArrowRightIcon, TrashIcon, PencilIcon}  from '@primer/octicons-react'

class App extends Component {

    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.addTask = this.addTask.bind(this)
    }

    componentDidMount() {
        this.fetchTasks()
    }

    addTask(e) {
        if(this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.fetchTasks()
                this.setState({ title: '', description: '', _id: ''})
            })
            .catch(err => console.log(err))

        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.fetchTasks()
                this.setState({ title: '', description: ''})
            })
            .catch(err => console.log(err))
       }   

    e.preventDefault()
    }

    fetchTasks() {
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({ tasks: data })
        })
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    deletedTask(id) {
        if(confirm('Are you sure you want to delete the task?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.fetchTasks()
            })
        }
    }

    editTask (id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
    }

    render() {
        return (
            <div>
                {/* { NAVIGATION } */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="/">Tasks Admin</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>

                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                               { this.state.tasks.map(task => {
                                    return (
                                        <div className="col-md-4" key={task._id} style={{ marginBottom: 10}}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{task.title}</h5>
                                                    <p className="card-text">{task.description}</p>
                                                    <p className="card-text"><small className="text-muted">{task.created_at}</small></p>
                                                </div>
                                                <div className="card-footer text-muted" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                    <div onClick={() => this.deletedTask(task._id)}><TrashIcon size={18} /></div>
                                                    <div onClick={() => this.editTask(task._id)}><PencilIcon size={18} /></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                               })}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.addTask}>
                                        <div className="form-group">
                                            <input
                                                autoComplete="off"
                                                className="form-control"
                                                name="title"
                                                value={this.state.title}
                                                onChange={this.handleChange}
                                                placeholder="Task"/>
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                                placeholder="Description">
                                            </textarea>
                                        </div>
                                        <button className="btn btn-primary">Send <ArrowRightIcon /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App