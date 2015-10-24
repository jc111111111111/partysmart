var fs = require('fs');
var path = require('path');

function parse(data) {
	var classes = [];
	var classStrings = data.split('id=\'DERIVED_CLSRCH_DESCR200$');
	for(var x = 1; x < classStrings.length; x++) {
		
		var classInfo = classStrings[x];
		
		var classSections = [];
		
		var sectionsInfo = classInfo.split(' href=\"javascript:submitAction_win0(document.win0,\'DERIVED_CLSRCH_SSR_CLASSNAME_LONG$');

		for(var i = 1; i < sectionsInfo.length; i++) {
			sectionInfo = sectionsInfo[i].substring(sectionsInfo[i].indexOf('>')+1);
			var name = between(sectionInfo, '', '</a></span>');
			classSections.push({
				name: name,

				id: between(name, '(', ')'),
				
				number: name.substring(0, name.indexOf('-')),
				
				type: name.substring(name.indexOf('-')+1, name.indexOf('(')),

				times: grab(sectionInfo, 'MTG_DAYTIME'),

				location: grab(sectionInfo, 'MTG_ROOM'),

				instructor: grab(sectionInfo, 'MTG_INSTR'),

				enrollment: {
					current: grab(sectionInfo, 'UM_DERIVED_SR_ENRL_TOT'),

					total: grab(sectionInfo, 'UM_DERIVED_SR_ENRL_CAP')
				}
			});
		}

		classes.push({
			title: between(classInfo, '>', '</span>').replace('&nbsp;',''),

			credits: grab(classInfo, 'UM_DERIVED_SR_UNITS_RANGE'),

			gened: (classStrings[x-1].indexOf('UM_DERIVED_SA_UM_GENED_VALUES') !== -1) ? 
				grab(classStrings[x-1], 'UM_DERIVED_SA_UM_GENED_VALUES') : "",

			sections: classSections
		});

	}
	return classes;
}

function grab(info, id) {
	var str = between(info, 'id=\''+id+'\$', '</span>');
	return str.substring(str.indexOf('>')+1);
}
	

function between(str, start, end) {
	var startIdx = str.indexOf(start)+start.length;
	var endIdx = str.indexOf(end, startIdx);
	return str.substring(startIdx, endIdx);
}

module.exports = parse;
