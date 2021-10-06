let Ubicacion=function(X,Y)
    {
        fetch('https://us1.locationiq.com/v1/reverse.php?key=pk.d23c79dee107f6534c5c884b85f0c952&lat='+X+'&lon='+Y+'&format=json')
        .then(response => response.json())
        .then(json =>
            {
                let data=json;
                let Ubicacion=document.getElementById('Resultado');
                Ubicacion.innerHTML="";
                if(data.error)
                    {
                        Ubicacion.innerHTML='<h2>Las coordenadas son incorrectas</h2>';
                    }
                else
                    {
                        Ubicacion.innerHTML=`
                        <a class="Texto">La información de las coordenadas es:</a>
                        <h2>${data.display_name}</h2>
                        <a class="Texto">Click en la cuidad para mostrar el tiempo</a>
                        <h1><label id="Ciudad" type=button onclick="Clima()"> --> ${data.address.state}</label></h1>
                                        `;
                        console.log(data.display_name);
                    }
            });  
    };

let Clima=function()
    {
        let ciudad=document.getElementById('Ciudad').innerText;
        let url=('http://api.weatherstack.com/current?access_key=ce5b2ca79d190280448dd08c04aac341&query=');
        let completa=url+ciudad;
        fetch(completa)
        .then(response => response.json())
        .then(json =>
            {   
                let data=json;
                let Ubicacion=document.getElementById('Resultado');
                Ubicacion.innerHTML=`
                <a class="Texto"> La ciudad de <a class="Resaltado"> ${data.location.name}</a></a><br><br>
                <a class="Texto"> Tiene una temperatura de <a class="Resaltado"> ${data.current.temperature} </a> grados centigrados.</a><br><br>
                                    `;
                for (let i=0;i<data.current.weather_descriptions.length;i++)
                    {
                        let tiempo=data.current.weather_descriptions[i];
                        Ubicacion.innerHTML+=`<a class="Texto">El tiempo en estos momentos esta <a class="Resaltado"> ${tiempo} </a></a>`; 
                    }
            }); 
    };


let btnMostrar=document.getElementById('btnMostrar');
btnMostrar.addEventListener('click',()=>
    {
        let X=document.getElementById('latitud').value;
        let Y=document.getElementById('longitud').value;
        let alerta=document.getElementById('Resultado');
        
        if(X!="" && Y!="")
            Ubicacion(X,Y);
        else
            alerta.innerHTML='<h2>Datos incompletos</h2>';
    });