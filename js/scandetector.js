function ScanDetector(options) {
	var me = this;
	me.eventLog = [];
	me.eventTypes = ["keydown", "keypress", "keyup"];
	me.options = options || {};
	
	me.init = function() {
		try {
			me.startEventListeners();
		} catch (error) {
			console.log(error);
		}
	};
	
	me.eventHandler = function(e) {
		if (e.target.value === '') eventLog = [];
		me.eventLog.push(e);
		let submissionTriggerKey = me.options.submissionTriggerKey || 'Enter';
		if (e.key === submissionTriggerKey) me.process(e);
	};
	
	me.process = function(e) {
		const event = new CustomEvent('scan', { detail: {
			value: e.target.value,
			entryType: me.guessEntryType()
		} });
		e.target.dispatchEvent(event);
		
		me.eventLog = [];
		e.target.value = "";
	};
	
	me.guessEntryType = function() {
		let eventLog = me.eventLog || [];
		
		let minimumScanLength = me.options.minimumScanLength || 3;
		if (eventLog.length < minimumScanLength) return 'manual';
		
		let threshold = me.options.threshold || 400; 		
		let firstEvent = eventLog.shift();
		let lastEvent = eventLog.pop();
		let timestampDifference = lastEvent.timeStamp - firstEvent.timeStamp;
		if (timestampDifference > threshold) return "manual";
			
		return "barcode scanner";
	};
	
	me.startEventListeners = function() {
		let eventType = (me.options.eventType || 'keyup').toLowerCase().trim();
		if (me.eventTypes.indexOf(eventType) === -1) throw "eventType not recognized";
		me.options.target.addEventListener(eventType, me.eventHandler);
	};
	
	me.init();
}