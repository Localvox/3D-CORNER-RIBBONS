$(document).ready(function() {

	// element for building ribbons
	var $ribbonBuilder = $('#ribbon-builder');
	var $ribbonBuilderRibbon = $ribbonBuilder.find('.ribbon');
	var $ribbonBuilderRibbonText = $ribbonBuilderRibbon.find('.text');
	var $ribbonBuilderColor = $ribbonBuilder.find('.color-block');
	var $ribbonBuilderSize = $ribbonBuilder.find('.size-block');
	var $ribbonBuilderText = $ribbonBuilder.find('.banner-text-block');

	// code element where code is outputted from the Ribbon Builder
	var $ribbonBuilderCode = $('#ribbon-builder-code');

	var size = '';
	var color = 'red';
	var text = '30 Day Free Trial';
	var ribbonClass = '';

	function prettyPrintCode() {

		$ribbonBuilderCode.text($.trim($('<div />').append($ribbonBuilderRibbon.clone()).html().replace(/\t/g, '    '))).removeClass('prettyprinted');
		prettyPrint();

	}

	$ribbonBuilderColor.on('click', function() {

		color = $(this).attr('data-color');
		ribbonClass = 'ribbon' + (size !== '' ? ' ribbon-'+size : '') + ' ribbon-'+color;

		$ribbonBuilderColor.removeClass('active');
		$(this).addClass('active');
		$ribbonBuilderRibbon.removeClass().addClass(ribbonClass);


		prettyPrintCode();

	});

	$ribbonBuilderSize.on('click', function() {

		size = $(this).attr('data-size');
		ribbonClass = 'ribbon' + (size !== '' ? ' ribbon-'+size : '') + ' ribbon-'+color;

		$ribbonBuilderSize.removeClass('active');
		$(this).addClass('active');
		$ribbonBuilderRibbon.removeClass().addClass(ribbonClass);

		prettyPrintCode();

	});

	$ribbonBuilderText.on('focus mouseup keyup', function(e) {

		if (e.type == 'mouseup') {

			e.preventDefault();

		} else if (e.type == 'keyup') {

			text = $(this).val();

			$ribbonBuilderRibbonText.html(text);

			prettyPrintCode();

		} else if (e.type == 'focus') {

			this.select();

		}

	});


	$('pre').find('code').each(function() {

		$(this).text($.trim($(this).html().replace(/\t/g, '    ')));

		var $pre = $(this).closest('pre');
		var $codeWrap = '';
		var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
		var uniqId = randLetter + Date.now();

		$pre.css({width:$(this).width(), margin: '0 auto'});
		$pre.attr('id', uniqId);

	});

	addEventListener('load', function (event) {
		prettyPrintCode();
	}, false);

});
