function fetchReadme (repositoryUrl) {
	var readmeUrl = repositoryUrl + 'README.md';

	$.get(readmeUrl)
	.then(response => {
		var usageBlock = response.split('## Usage')[1];
		
		var rawCodeBlock = usageBlock.split('```')[1].split('\n');
		rawCodeBlock.splice(0, 1);
		var codeBlock = rawCodeBlock.join('\n');
		
		$('*[data-fill="usage_code_snippet"]').text(codeBlock);
	})
	.then(r => {
		
		$.getScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/prism.min.js');
		$.getScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/plugins/line-numbers/prism-line-numbers.min.js');
	})
	.catch(e => console.error('README.md not found at ' + readmeUrl));
}

function fetchMetaData(repositoryUrl) {
	var pkgUrl = repositoryUrl + 'package.json';

	$.get(pkgUrl)
	.then(response => {
		var pkgDetail = JSON.parse(response);
		
		$('title').text(pkgDetail.name + ' - ' + pkgDetail.short_description);
		$('meta[name=description]').attr('content', pkgDetail.description);
		
		$('*[data-fill="copyright"]').html('&copy; ' + new Date().getFullYear() + ' ' + pkgDetail.name + ' - ' + pkgDetail.license);
		
		$('*[data-fill="name"]').html(pkgDetail.name);
		$('*[data-fill="short_description"]').html(pkgDetail.short_description);
		$('*[data-fill="description"]').html(pkgDetail.description);
		
		$('*[data-fill="href_repository_url"]').attr('href', pkgDetail.repository);
		$('*[data-fill="href_npm_url"]').attr('href', 'https://www.npmjs.com/package/' + pkgDetail.name);
		$('*[data-fill="href_licence_url"]').attr('href', pkgDetail.license_url);
	})
	.catch(e => console.error('package.json not found at ' + pkgUrl));;
}

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function init() {
	var pkgName = getUrlParameter('name');
	var repoUrl = 'https://raw.githubusercontent.com/ismailnguyen/' + pkgName + '/master/';

	fetchMetaData(repoUrl);
	fetchReadme(repoUrl);
}

$(document).ready(init);
