$(document).ready(function(){
	
	$(".navbar-link").click(function(event){
		
		$(".container-fluid").each(function(index, el) {
            $(this).hide();
        });
		
		var id = $(this).attr("id");
		if(id === "tabSer"){
			$("#tabSer").addClass('active');
			$("#tabKom").removeClass('active');
			$("#divSertifikat").show();
		} else if (id === "tabKom"){
			$("#tabKom").addClass('active');
			$("#tabSer").removeClass('active');
			$("#divKomunikacija").show();
		}

	});
	
	$("#tabSer").trigger('click');
	
	$("small").each(function(index, el){
		$(this).hide();
	});

	$.ajax({
		type: "GET",
		url: "/Certificate/getAll",
		contentType: 'application/json',
		success: function(data){
			$("#tabelaNovihSertifikata").html("");
			$("#tabelaNovihSertifikataKom").html("");
			upisiSertifikate(data);
			upisiZaKomunikaciju(data);
		},
	});
	
	function upisiSertifikate(data) {
		for(i = 0; i < data.length; i++){
			if(data[i].revoked == true){
				if(data[i].idNadSertifikata != null){
					var pom = '<tr><td>'+data[i].idNadSertifikata+'</td>'+
					'<td>'+data[i].imeAplikacije+'</td>'+
					'<td>'+data[i].datumIzdavanja+'</td>'+
					'<td>'+data[i].datumIsteka+'</td>'+
					'<td> POVUCEN </td></tr>';
				} else {
					var pom = '<tr><td>/</td>'+
					'<td>'+data[i].imeAplikacije+'</td>'+
					'<td>'+data[i].datumIzdavanja+'</td>'+
					'<td>'+data[i].datumIsteka+'</td>'+
					'<td> POVUCEN </td></tr>';
				}
			}
				
			else {
				if(data[i].idNadSertifikata != null){
					var pom = '<tr><td>'+data[i].idNadSertifikata+'</td>'+
					'<td>'+data[i].imeAplikacije+'</td>'+
					'<td>'+data[i].datumIzdavanja+'</td>'+
					'<td>'+data[i].datumIsteka+'</td>'+
					'<td> VALIDAN </td>'+
					'<td><button id="'+data[i].id+'" class="btn btn-link">Povuci sertifikat</button></td></tr>';
				} else {
					var pom = '<tr><td>/</td>'+
					'<td>'+data[i].imeAplikacije+'</td>'+
					'<td>'+data[i].datumIzdavanja+'</td>'+
					'<td>'+data[i].datumIsteka+'</td>'+
					'<td> VALIDAN </td>'+
					'<td><button id="'+data[i].id+'" class="btn btn-link">Povuci sertifikat</button></td></tr>';
				}
			}
			$("#tabelaNovihSertifikata").append(pom);
		}
	}
	
	function upisiZaKomunikaciju(data) {
		for(i = 0; i < data.length; i++){
			if(data[i].revoked == true){
				if(data[i].idNadSertifikata != null){
					var pom = '<tr><td>'+data[i].idNadSertifikata+'</td>'+
					'<td>'+data[i].imeAplikacije+'</td>'+
					'<td>'+data[i].datumIzdavanja+'</td>'+
					'<td>'+data[i].datumIsteka+'</td>'+
					'<td> POVUCEN </td></tr>';
				} else {
					var pom = '<tr><td>/</td>'+
					'<td>'+data[i].imeAplikacije+'</td>'+
					'<td>'+data[i].datumIzdavanja+'</td>'+
					'<td>'+data[i].datumIsteka+'</td>'+
					'<td> POVUCEN </td></tr>';
				}
			}
				
			else {
				if(data[i].idNadSertifikata != null){
					var pom = '<tr><td>'+data[i].idNadSertifikata+'</td>'+
					'<td>'+data[i].imeAplikacije+'</td>'+
					'<td>'+data[i].datumIzdavanja+'</td>'+
					'<td>'+data[i].datumIsteka+'</td>'+
					'<td> VALIDAN </td>';
				} else {
					var pom = '<tr><td>/</td>'+
					'<td>'+data[i].imeAplikacije+'</td>'+
					'<td>'+data[i].datumIzdavanja+'</td>'+
					'<td>'+data[i].datumIsteka+'</td>'+
					'<td> VALIDAN </td>';
				}
			}
			$("#tabelaNovihSertifikataKom").append(pom);
		}
	}
	
	$("#tabelaNovihSertifikata").on('click', 'button', function(event){
		var id = $(this).attr('id');
		$.ajax({
			type: "POST",
			url: "/Certificate/"+id,
			contentType: 'application/json',
			success: function(data){
				$.ajax({
					type: "GET",
					url: "/Certificate/getAll",
					contentType: 'application/json',
					success: function(data){
						$("#tabelaNovihSertifikata").html("");
						$("#tabelaNovihSertifikataKom").html("");
						upisiSertifikate(data);
						upisiZaKomunikaciju(data);
						$.ajax({
							type: "GET",
							url: "/Certificate/getNoRevoke",
							contentType: 'application/json',
							success: function(data){
								$("#comboSertifikat1").html("");
								$("#comboSertifikat2").html("");
								upisiValidne(data);
							},
						});
						
						$.ajax({
							type: "GET",
							url: "/Certificate/getCa",
							contentType: 'application/json',
							success: function(data){
								$("#comboSertifikat").html("");
								upisiCa(data);
							},
						});
					},
				});
			},
		});
	});
	
	$.ajax({
		type: "GET",
		url: "/Certificate/getNoRevoke",
		contentType: 'application/json',
		success: function(data){
			$("#comboSertifikat1").html("");
			$("#comboSertifikat2").html("");
			upisiValidne(data);
		},
	});
	
	$.ajax({
		type: "GET",
		url: "/Certificate/getCa",
		contentType: 'application/json',
		success: function(data){
			$("#comboSertifikat").html("");
			upisiCa(data);
		},
	});
	
	function upisiValidne(data){
		for(var i = 0;i < data.length; i++){
			var pom = '<option value ="'+data[i].id+'">'+data[i].id+'</option>';
			$("#comboSertifikat1").append(pom);
			$("#comboSertifikat2").append(pom);
		}
	}
	
	function upisiCa(data){
		for(var i = 0;i < data.length; i++){
			var pom = '<option value ="'+data[i].id+'">'+data[i].id+'</option>';
			$("#comboSertifikat").append(pom);
		}
	}
	
	function ocistiFormu(){
		$("#nadSertifikat").val("");
		$("#subject").val("");
		$("#datumIzdavanja").val("");
		$("#datumIsticanja").val("");
		$("#checkCA").checked = false;
	}
	
	$("#kreirajSert").click(function(event){
		
		var nadSertifikat = $("#nadSertifikat option:selected").text();
		var kome = $("#subject").val();
		var datum = $("#datumIzdavanja").val();
		var datum1 = $("#datumIsticanja").val();
		var ca = $("#checkCA").is(":checked");
		
		var sertifikat = new Object();
		
		sertifikat.idNadSertifikata = nadSertifikat;
		sertifikat.datumIzdavanja = datum;
		sertifikat.datumIsteka = datum1;
		sertifikat.authority = ca;
		sertifikat.imeAplikacije = kome;
		
		$.ajax({
			type: "POST",
			url: "/Certificate/dodajSertifikat",
			data: JSON.stringify(sertifikat),
			contentType: 'application/json',
			success: function(data){
				ocistiFormu();
				$.ajax({
					type: "GET",
					url: "/Certificate/getAll",
					contentType: 'application/json',
					success: function(data){
						$("#tabelaNovihSertifikata").html("");
						$("#tabelaNovihSertifikataKom").html("");
						upisiSertifikate(data);
						upisiZaKomunikaciju(data);
					},
				});
				$.ajax({
					type: "GET",
					url: "/Certificate/getNoRevoke",
					contentType: 'application/json',
					success: function(data){
						$("#comboSertifikat1").html("");
						$("#comboSertifikat2").html("");
						upisiValidne(data);
					},
				});
				
				$.ajax({
					type: "GET",
					url: "/Certificate/getCa",
					contentType: 'application/json',
					success: function(data){
						$("#comboSertifikat").html("");
						upisiCa(data);
					},
				});
			},
		});
		
	});
	
});
