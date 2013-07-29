$(document).ready(function() {

	var $ribbonBuilder = $('#ribbon-builder');
	var $ribbonBuilderCode = $('#ribbon-builder-code');
	var $ribbon = $ribbonBuilder.find('.ribbon');
	var size = '';
	var color = 'red';
	var text = '30 Day Free Trial';
	var ribbonClass = '';

	/* var codeControls = '<div class="code-controls"><a class="code-raw" title="View Raw" data-action="code-raw"></a><a class="code-copy" title="Copy Code" data-action="code-copy"></a><a class="code-download" title="Download Code" data-action="code-download"></a></div>'; */

	var codeControls = '<div class="code-controls"><a class="code-copy" title="Copy Code" data-action="code-copy"></a></div>';


	$ribbonBuilder.find('.color-block').on('click', function() {

		color = $(this).attr('data-color');
		ribbonClass = 'ribbon' + (size != '' ? ' ribbon-'+size : '') + ' ribbon-'+color;

		$ribbonBuilder.find('.color-block').removeClass('active');
		$(this).addClass('active');
		$ribbon.removeClass().addClass(ribbonClass);

		$ribbonBuilderCode.text($.trim($('<div />').append($ribbon.clone()).html().replace(/\t/g, '    '))).removeClass('prettyprinted');
		prettyPrint();

	});

	$ribbonBuilder.find('.size-block').on('click', function() {

		size = $(this).attr('data-size');
		ribbonClass = 'ribbon' + (size != '' ? ' ribbon-'+size : '') + ' ribbon-'+color;

		$ribbonBuilder.find('.size-block').removeClass('active');
		$(this).addClass('active');
		$ribbon.removeClass().addClass(ribbonClass);

		$ribbonBuilderCode.text($.trim($('<div />').append($ribbon.clone()).html().replace(/\t/g, '    '))).removeClass('prettyprinted');
		prettyPrint();

	});

	$ribbonBuilder.find('.banner-text-block').on('focus', function() {

		this.select();

	});

	$ribbonBuilder.find('.banner-text-block').on('mouseup', function(e) {
		e.preventDefault();
	});

	$ribbonBuilder.find('.banner-text-block').on('keyup', function() {

		text = $(this).val();

		$ribbon.find('.text').html(text);

		$ribbonBuilderCode.text($.trim($('<div />').append($ribbon.clone()).html().replace(/\t/g, '    '))).removeClass('prettyprinted');
		prettyPrint();

	});

	$('pre').find('code').each(function() {

		$(this).text($.trim($(this).html().replace(/\t/g, '    ')));

		var $pre = $(this).closest('pre');
		var $codeWrap = '';
		var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
		var uniqId = randLetter + Date.now();

		$pre.css({width:$(this).width(), margin: '0 auto'});
		$pre.wrap('<div class="code-wrapper" />');
		$codeWrap = $pre.closest('.code-wrapper').append(codeControls);
		$pre.attr('id', uniqId);

		$codeWrap.find('[data-action="code-raw"]').on('click', function() {

			var w = window.open();
			var html = $('#'+uniqId).text();
			//var html = htmlBeautifier(html);

			w.document.writeln(html);

/*
			var w = window.open();
			  var html = $('#'+uniqId).find('code').find('.linenums').remove().text();

			  // how do I write the html to the new window with JQuery?
			    $(w.document.body).html(html);
*/
		
			//console.log($('#'+uniqId).text());

			var element = document.getElementById(uniqId);

			if (document.body.createTextRange) {
				// ms
				var range = document.body.createTextRange();
				range.moveToElementText(element);
				range.select();
			} else if (window.getSelection) {
				// moz, opera, webkit
				var selection = window.getSelection();
				var range = document.createRange();
				range.selectNodeContents(element);
				selection.removeAllRanges();
				selection.addRange(range);
			}

		});

	});

	addEventListener('load', function (event) {
		$ribbonBuilderCode.text($.trim($('<div />').append($ribbon.clone()).html().replace(/\t/g, '    '))).removeClass('prettyprinted');
		$(this).closest('pre').addClass('code-wrapper').append(codeControls).css({width:$(this).width(), margin: '0 auto'});
		prettyPrint();
	}, false);

});

/*$("a").zclip({
    path: "http://zeroclipboard.github.io/ZeroClipboard/javascripts/ZeroClipboard.swf",
    copy: $('code').text()
}); */



function copyToClipboard(s) {
	if( window.clipboardData && clipboardData.setData ) {
		clipboardData.setData("Text", s);
	}
	else
	{
		// You have to sign the code to enable this or allow the action in about:config by changing
		user_pref("signed.applets.codebase_principal_support", true);
		netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

		var clip = Components.classes['@mozilla.org/widget/clipboard;[[[[1]]]]'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip) return;

		// create a transferable
		var trans = Components.classes['@mozilla.org/widget/transferable;[[[[1]]]]'].createInstance(Components.interfaces.nsITransferable);
		if (!trans) return;

		// specify the data we wish to handle. Plaintext in this case.
		trans.addDataFlavor('text/unicode');

		// To get the data from the transferable we need two new objects
		var str = new Object();
		var len = new Object();

		var str = Components.classes["@mozilla.org/supports-string;[[[[1]]]]"].createInstance(Components.interfaces.nsISupportsString);

		var copytext=meintext;

		str.data=copytext;

		trans.setTransferData("text/unicode",str,copytext.length*[[[[2]]]]);

		var clipid=Components.interfaces.nsIClipboard;

		if (!clip) return false;

		clip.setData(trans,null,clipid.kGlobalClipboard);	   
	}
}