import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import Appfilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';
import { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Jhon', salary: "1900", increase: false, id: 1, like: true },
                { name: 'Alex', salary: "3000", increase: false, id: 2, like: false },
                { name: 'Dave', salary: "800", increase: false, id: 3, like: false },
            ],
            term: '',
            filter: 'all'
        };
        this.maxId = 4;
    }



    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            like: false,
            increase: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))
    }
    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({ term });
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'like':
                return items.filter(item => item.like);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }





    render() {
        const { data, term, filter } = this.state
        const employersLength = this.state.data.length;
        const increased = this.state.data.filter(i => i.increase).length
        const visibleData = this.filterPost(this.searchEmp(data, term), filter)
        return (
            <div className='app'>
                <AppInfo
                    employersLength={employersLength}
                    increased={increased} />
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />
                    <Appfilter
                        filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>
                <EmployersList
                    onDelete={this.deleteItem}
                    data={visibleData}
                    onToggleProp={this.onToggleProp} />
                <EmployersAddForm
                    onAdd={this.addItem} />
            </div>
        )
    }

}

export default App