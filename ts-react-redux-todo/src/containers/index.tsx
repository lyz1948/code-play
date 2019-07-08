import * as React from 'react'
import * as styles from './style.css'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { omit } from '../utils'
import { Header, Footer } from '../components'
import { TodoModel } from '../store/models'
import { RootState } from '../store/reducers'
import { TodoActions } from '../store/actions'
import { TodoList } from '../components/TodoList'

const FILTER_VALUES = (Object.keys(
  TodoModel.Filter,
) as (keyof typeof TodoModel.Filter)[]).map((key) => TodoModel.Filter[key])

const FILTER_FUNCTIONS: Record<
  TodoModel.Filter,
  (todo: TodoModel) => boolean
> = {
  [TodoModel.Filter.SHOW_ALL]: () => true,
  [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
  [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed,
}

export namespace App {
  export interface IProps extends RouteComponentProps<void> {
    todos: RootState.TodoState
    actions: TodoActions
    filter: TodoModel.Filter
  }
}

@connect(
  (state: RootState, ownProps): Pick<App.IProps, 'todos' | 'filter'> => {
    const hash = ownProps.location && ownProps.location.hash.replace('#', '')
    const filter =
      FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL
    return { todos: state.todos, filter }
  },
  (dispatch: Dispatch): Pick<App.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch),
  }),
)

export class App extends React.Component<App.IProps> {
  static defaultProps: Partial<App.IProps> = {
    filter: TodoModel.Filter.SHOW_ALL,
  }

  constructor(props: App.IProps, context?: any) {
    super(props, context)
    this.handleClearCompleted = this.handleClearCompleted.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleClearCompleted(): void {
    const hasCompletedTodo = this.props.todos.some(
      (todo) => todo.completed || false,
    )
    if (hasCompletedTodo) {
      this.props.actions.clearCompleted()
    }
  }

  handleFilterChange(filter: TodoModel.Filter): void {
    this.props.history.push(`#${filter}`)
  }

  render() {
    const { todos, actions, filter } = this.props
    const activeCount =
      todos.length - todos.filter((todo) => todo.completed).length
    const filteredTodos = filter
      ? todos.filter(FILTER_FUNCTIONS[filter])
      : todos
    const completedCount = todos.reduce(
      (count, todo) => (todo.completed ? count + 1 : count),
      0,
    )

    return (
      <div className={styles.normal}>
        <Header addTodo={actions.addTodo} />
        <TodoList todos={filteredTodos} actions={actions} />
        <Footer
          filter={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClickClearCompleted={this.handleClearCompleted}
          onClickFilter={this.handleFilterChange}
        />
      </div>
    )
  }
}
