import { observable, action } from 'mobx'

export default class Store {
  @observable username = 'admin'

  @action
  changeUserName = name => {
    console.log('123123', name)
    this.username = name
  }
}
