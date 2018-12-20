var $select_all 				= false;
var $multiSelect			= true;
(function($) {
    $.fn.makeRowsSelectable= function() {
		
		$table 					= $(this);
		$selectAllOption 	=  '<div class="select_all" refTable="'+$table.attr('id')+'">Select all <span class="count">['+$('tbody tr.selected').length+']</span></div>';
		
		//add select all before table and after table		
		if($multiSelect){
			$table.before($selectAllOption);
			$table.after($selectAllOption);
		}
		

		//add extra column to start of head tr
		$table.find('thead tr').prepend('<th class="selector"></th>');
		
		//add select boxes to start of body tr
		$table.find('tbody tr').prepend('<td  class="selector"><div class="select_box"></div></td>');
		
		//select all function
		$('body').on('click', '.select_all', function(){
			if(!$select_all){
				$('.select_all').addClass('selected');
				$('#'+$(this).attr('refTable')).find('tr.selectable').addClass('selected');
				$('table .selector').stop(true).fadeIn('slow');
				$('.select_all .count').	text('['+$('tbody tr.selected').length+']');
				$select_all = true;
			}
			else{
				$('.select_all').removeClass('selected');
				$('#'+$(this).attr('refTable')).find('tr.selectable').removeClass('selected');
				$('table .selector').stop(true).fadeOut('slow');
				$('.select_all .count').	text('['+$('tbody tr.selected').length+']');
				$select_all = false;
			}
		})
		
		
		//select row function
		$table.on('click', 'tr.selectable', function(){
			if($multiSelect){
				$('.select_all').removeClass('selected');
				$select_all = false;
				$(this).toggleClass('selected');
				$('.select_all .count').	text('['+$('tbody tr.selected').length+']');
				if ($('tbody tr.selected').length > 0){
					//start mutliple select
					$('table .selector').stop(true).fadeIn('slow');
				}else{
					//end mutliple select
					$('table .selector').stop(true).fadeOut('slow');
				}
			}else{
				$table.find('tr.selectable').removeClass('selected');
				$(this).addClass('selected');
			}
	});
		
		
	};
}(jQuery));