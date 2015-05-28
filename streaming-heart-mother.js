function streamingHeartMother(emitter, declare){
	var found= {},
	  _emit= emitter.emit
	function registerEvent(event){
		found[event]= true
	}
	emitter.emit= function emit(event){
		if(!found[event]){
			_emit.call(this, 'newListener', event, noop)
			registerEvent(event)
		}
		_emit.call(this, arguments)
	}
	emitter.on('newListener', registerEvent)
	if(declare === true){
		Object.defineProperty(emitter, 'knownEvents', {
			get: function(){
				return found.keys()
			}
		})
	}
	return emitter
}
module.exports= streamingHeartMother

function noop(){}
module.exports.noop = noop
