# react-native-ortho
🚀 official react native SDK for ortho  



# Examples
```js
import {Ortho} from 'tryortho' 

<Ortho.Community 
	slug={‘ortho-okra-short-url’}
	config={{"short-url":"<your-short-url-here>"}}
	callback={(res:{callback:string; response:Array })=>
		{
		const {callback, response} = res
		switch(callback){
			case ’onSuccess’:
				console.log(response)
			break;

			case ’onError’:
				console.log(response)
			break;

			case ’onClose’:
				console.log(response)
			break;
		}
	     }
	} 
/>
```
