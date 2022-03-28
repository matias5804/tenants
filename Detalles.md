1- Traigo tenants de SERVICE.js,
    -importo useState y useEffect
    -Creo un [currentTenants,setCurrentTenant] = useState([]) 
    -La traigo con el fetch y  uso el useEffect con un fetchData adentro Service.getTenants()
                      SetCurrentTenant(data)

2- Pintar la tabla con los tenants traidos
    -Pinto la tabla en el <tbody> mapeando currentTenants, asigno key al <tr> y dando valores a los <td> con la info de currentTenants(data)

3- Comienzo con el filtrado de la tabla -(all- paymentLate- LessThenMonths), para hacer el lessthenMonth, 
    -Creo [tenants, setTenants] = useState([]);
    -Agrego setTendats(data) al fetchData
    -Creo las funciones all - paymentLate - lessthen Months 
    -Creo una funcion para hacer la diferencia de mes(monthDiff)
    -Vinculo las funciones de filtrado con sus botones en los links correspondientes con onClick={} - 
    -Creo un [tabActive, setTabActive] = useState([1])
    -Le asigno a cada link un tabActive == n°(1,2,3)

5- Ordeno la tabla
    -Creo 4 funciones para ordenar ( ordenById , ordenByName, orderByStatus y ordenDate ) todas tienen como cierre setCurrentTenants([..data]) y todos tiene el metodo data.sort()
    -Creo los onClick={} correspondiente en cada <th>

6- Para borrar el tenants
    -Creo la funcion deleteTenant= async (ternantId) =>{}
    -Traigo y cargo la funcion Service.deleteTenant adentro con un try y un catch
    -Asigno la f al evento onClinck con el (item.id) <button>

7-Para empezar a cargar el formulario 
    -Lo primero que hice fue hacer un onClick={()=>setShowForm(true} en el <button>Add Tenant ,lo pongo con true para que cuando active el onClick se me abra el formulario
    -Cree un estado  const [showForm, setShowForm] = useState(false), con false para que este cerrado hasta que cambie de estado
    -Agrego el showForm como si fuera un objeto y cargo el form adentro para que se abra 
    -Agrego el onClick (false) en el <button>cancel para que se cierre 

8-Para guardar 
    -Creo la funcion saveTenant = async (event) =>{}
    -Cargo adentro los event.preventDefault(); 
    -Adentro creo una variable ternant = {con el valor correspondiente a cada imput del formulario}
    -Asignar valor a los input
    -Hago un if para validar que la fecha ingresada este acorde a una fecha futura
    -Hago un try y catch por si llega a saltar algun error
    -Le asigno al formulario un onSubmit ={saveTenant}

9- Detalles
    -Hago style={{cursor:"pointer"}} en los links para mejorar experiencia de usuario



-falta:
 cuando agrego una fecha en el formulario y la ingreso de manera incorrecta me tira error. logre hacer un alerta si la fecha cargada es vieja pero falta corregir errores.   
-Cuando hago el filtro por Payment is late y lease ends in less a month, si quiero hacer un filtro por ej por name, me devuelve el filtro name de All, y me tendria que volver el filtro name pero de paymentIsLate.
-Me tira error cuadno cargo un inquilino nuevo dando enter en la entrada del name.
-Mejorar el formato de la fecha de los inquilinos








