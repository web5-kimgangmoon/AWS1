```bash
git reset origin
git reset --header main/origin
```

```ts
// Custom Hook
// use로 시작하는 식별자를 사용한다.
// Hook끼리는 독립적이기에 다른 hook을 가져다 state로 사용하지 못한다.
// HTML 문법이 포함되지 못한다.
```

useMemo  
useState  
useCallback  
useEffect  
useState  
useLocation  
useContext
useParams

react-router-dom
BrowserRouter
Outlet
Link

RouterProvider
const router = createBrowser([
{path:"/", element:<div>하이?</div>},
{
path:"/test",
element:{

<div>
testing
{/_<Outlet />_/}
</div>
},
children:[
{
path:"/test/tt",
element:<div>TestTest</div>
component:ddlasdl
}
]
}
])
