import React from 'react';

class Home extends React.Component{
    state = {data:[
            {nama: 'Seto',
            usia: 30,
            pekerjaan: 'guru'
            },
            {nama: 'Andi',
            usia: 20,
            pekerjaan: 'murid'
            }

    ], selectEdit:undefined, filter:'all'}

    // state = {nama:[],usia:[],pekerjaan:[]}

    componentDidMount(){
        this.renderData()
    }
     
    addData = () => {
        var newData = {
            nama: this.refs.nama.value,
            usia: this.refs.usia.value,
            pekerjaan: this.refs.pekerjaan.value
        }
        this.setState({data:[...this.state.data,newData]})
        this.renderData()
        this.renderPekerjaan()

    }

    deleteData = (a) => {
        var yes = window.confirm('Are you sure you want to delete item '+a+'?')
        if(yes){
            this.state.data.splice(a,1)
    }
        this.setState({data: this.state.data})
        this.renderData()
    }

    deleteAll = () => {
        var yes = window.confirm('Are you sure you want to delete all?')
        if(yes){
            this.state.data.splice(0,this.state.data.length)
        }
        this.setState({data: this.state.data})
        this.renderData()
    }

    editData = (a) => {
        this.setState({selectEdit:a})
    }

    saveData = (a) => {
        // alert(this.refs.pekerjaanEdit.value)

        // var dataEdit = {
        //     nama: this.refs.namaEdit.value,
        //     usia: this.refs.usiaEdit.value?this.refs.usiaEdit.value:this.refs.usia.value,
        //     pekerjaan: this.refs.pekerjaanEdit.value?this.refs.pekerjaan.value:this.refs.usia.value,
        // }
        this.state.data.splice(a,1)
        this.setState({data:[...this.state.data,{
            nama:this.refs.namaEdit.value?this.refs.namaEdit.value:this.refs.nama.value,
            usia:this.refs.usiaEdit.value?this.refs.usiaEdit.value:this.refs.usia.value,
            pekerjaan:this.refs.pekerjaanEdit.value?this.refs.pekerjaanEdit.value:this.refs.pekerjaan.value}],
            selectEdit:undefined})
    }
    


        renderData = () => {
            if(this.state.filter!=='all'){
                var newTampil = this.state.data.filter((val)=>{
                    return val.pekerjaan === this.state.filter
                })
                var jsx = newTampil.map((val,index)=>{
                    if(this.state.selectEdit===index){
                        return(
                            <tr>
                                <td><input type='text' defaultValue={val.nama} ref='namaEdit'/></td>
                                <td><input type='text' defaultValue={val.usia} ref='usiaEdit'/></td>
                                <td><input type='text' defaultValue={val.pekerjaan} ref='pekerjaanEdit'/></td>
                            </tr>)
                    }else{
                        return(
                            <tr>
                                <td>{val.nama}</td>
                                <td>{val.usia}</td>
                                <td>{val.pekerjaan}</td>
                            </tr>
                        )}         
                })
                return jsx
            }else{
                var jsx2 = this.state.data.map((val,index)=>{
                    if(this.state.selectEdit===index){
                        return(
                            <tr>
                                <td><input type='text' defaultValue={val.nama} ref='namaEdit'/></td>
                                <td><input type='text' defaultValue={val.usia} ref='usiaEdit'/></td>
                                <td><input type='text' defaultValue={val.pekerjaan} ref='pekerjaanEdit'/></td>
                                <td><input type='button' className='form-control btn-success' value='SAVE' onClick={()=>this.saveData(index)} />
                                    <input type='button' className='form-control btn-danger' value='CANCEL' onClick={()=>this.setState({selectEdit:undefined})} /></td>
                            </tr>)
                    }else{
                        return(
                            <tr>
                                <td>{val.nama}</td>
                                <td>{val.usia}</td>
                                <td>{val.pekerjaan}</td>
                                <td><input type='button' className='form-control btn-success' value='EDIT' onClick={()=>this.editData(index)} />
                                    <input type='button' className='form-control btn-danger' value='DELETE' onClick={()=>this.deleteData(index)} /></td>
                            </tr>
                        )}         
                })
                return jsx2
            }
            
            }
    
        renderPekerjaan = () => {
            var jsx = this.state.jobs.map((val)=>{
                return(
                <option value={val.pekerjaan}>{val.pekerjaan}</option>
            )})
            return jsx
        }

        // filterJob = () => {
        //     alert(this.refs.job.value)
        //     var newTampil = this.state.data.filter((jobs)=>{
        //         return jobs.pekerjaan === this.refs.job.value
        //     })
        //     this.setState({data:newTampil})
        // }


    render(){
        return(
            <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select ref='job' onChange={()=>this.setState({filter:this.refs.job.value})} className='form-control'>
                            <option value='all'>Filter By Pekerjaan</option>
                            {this.renderPekerjaan()}
                        </select>
                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>Nama</td>
                            <td>Usia</td>
                            <td>Pekerjaan</td>
                            <td>Act</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderData()}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-3'> <input ref='nama' type='text' className='form-control' placeholder='Nama' /> </div>
                    <div className='col-md-3'> <input ref='usia' type='text' className='form-control' placeholder='Usia' /> </div>
                    <div className='col-md-3'> <input ref='pekerjaan' type='text' className='form-control' placeholder='Pekerjaan' /> </div>
                    <div className='col-md-3'> <input type='button' className='form-control btn-info' value='ADD' onClick={this.addData} />
                    </div>
                </div>
                <div className='row mt-3'>
                <input type='button' className='form-control btn-danger' value='Delete All' onClick={this.deleteAll} />
                </div>
            </div>
        )
    }
}

export default Home