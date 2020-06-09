import { observable, action } from 'mobx'

export default class Store {
  @observable username = 'admin'

  @action
  changeUserName = name => {
    this.username = name
  }
}
