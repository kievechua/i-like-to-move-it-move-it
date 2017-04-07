# Usage
Normal usage
```
import moveIt from 'i-like-to-move-it-move-it'
moveIt()
// or
moveIt({ history: false })
```

With magnet
```
magnet([
  fromM('config'),
  fromM('bunyan'),
  fromM('koa'),

  env.dev && fromNode('i-like-to-move-it-move-it/magnet')
])
```
