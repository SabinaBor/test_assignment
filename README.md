# Тестовое задание для "Аврора Холдинг" - Vue.js проект

***  

Для того, чтобы использовать json файл, как хранилище данных, использовался
JSON-server, который идеально подошёл для тестирования CRUD операций,
написанных с помощью Vuex. 
Идея добавления, удаления и редактирования children элементов состоит в том,
чтобы изменить родителя (добавить новый дочерний объект, удалить дочерний объект,
изменить его), а затем с помощью PUT операции, обновить его в базе данных.

***  

В самой базе данных я поменяла две вещи, слово *count* поменяла на *factCount*,
для более удобного пользования и понимания. Также добавила компоненты id, 
для удобства в вызове CRUD операций. Так например, если родительский компонент имеет
*id* = 1, то его подразделения имеют id 1*, и т д. Благодаря этому, имея *id* 
отдела (самого крайнего компонента), можно найти *id* управления и города.

```
Пример:
*id* отдела = 132, (то есть Отдел 2 Управления 3 в городе с *id* = 1) 
тогда *id* управления = Math.round(132 / 10) = 13,
а *id* города = Math.round(132 / 100) = 1
```

***

Для более удобного пользования и опрятности, для CSS компонентов был создан 
отдельный файл *globals.css*
