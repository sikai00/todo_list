import '../node_modules/normalize.css';
import './style.css';
import Todo from './modules/Todo';
import Project from './modules/Project';
import drawProjectNode from './modules/UI/ProjectUI';

const todo_list = [
  new Todo('hi'),
  new Todo('jelloaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
  new Todo('cello'),
  new Todo('bello'),
  new Todo('hello'),
]

document.querySelector('body').appendChild(drawProjectNode(new Project('today', todo_list)));