function streamingHeartMother(emitter){
	var found= {},
	  _emit= emitter.emit
	function registerEvent(event){
		found[event]= true
	}
	emitter.emit= function emit(event){
		if(!found[event]){
			emitter.emit('newListener', event)
			registerEvent(event)
		}
		_emit.call(this, arguments)
	}
	emitter.on('newListener', registerEvent)
	return emitter
}
module.exports= streamingHeartMother
