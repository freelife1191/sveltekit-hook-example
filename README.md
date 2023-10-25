# 스벨트 Hook 사용 패턴 (feat. Auth)

https://youtu.be/kK93COe7FAE?si=215tdJb3TNHANQSk

- Documents: https://kit.svelte.dev/docs/hooks
- VS Code Plugin: https://marketplace.visualstudio.com/items?itemName=ArielSalgado.kit-snippets

## 🚦 후킹 (hooking)
파일명 (`src/hooks.server.js`)
```js
export async function handle({ event, resolve })
{
  // 후킹해서 하고 싶은 코드를 작성
  // ex) DB client 초기화, 인증 등

  const response = await resolve(event);
  return response;
}
```

`src/hooks.server.js` 구현
```js
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // if (event.url.pathname.startsWith("/hook")) {
    //     return new Response("🪝");
    // }
    // const session = event.cookies.get('session');
    // const user = await getUser(session);
    
    // 인증절차를 거쳐서 locals 저장소에 데이터 저장 (사용자 지정 데이터를 request에 심은 것. 후킹을 이용해서)
    event.locals.user = "프리라이프"
    
    return resolve(event);
}
```

## stores
https://kit.svelte.dev/docs/state-management#using-stores-with-context
[app-stores](https://kit.svelte.dev/docs/modules#$app-stores)

`src/routes/+layout.server.js`
```js
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    return { user: locals.user };
} 
```

`src/routes/+page.svelte`
```html
<script>
    import{ page } from '$app/stores';
</script>

{#if $page.data.user}
    Welcome {$page.data.user}
{/if}
```

## Multiple Hook

`src/hooks.server.js`
```js
import { sequence } from '@sveltejs/kit/hooks';

/** @type {import('@sveltejs/kit').Handle} */
export async function hook1({ event, resolve }) {
    event.locals.user = "프리라이프";

    console.log("hook1 실행됨");

    return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
export async function hook2({ event, resolve }) {
    console.log("hook2 실행됨");

    return resolve(event);
}

export const handle = sequence(hook1, hook2);
```