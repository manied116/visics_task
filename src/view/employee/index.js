import React,{useState,useEffect} from 'react'
// NPM
import { toast,ToastContainer } from 'react-toastify';

// API
import { getApplication,deleteApplication,addApplication,updateApplication,getApplicatioinById } from '../../apiInfo';

// COMPONENTS
import AddApplication from '../../assets/components/addApplication';

function JobApplication() {

  	const [pageInfo,setPageinfo] = useState([]);
	const [deleteId,setDeleteId] = useState([]);
	const [formData,setFormData] = useState({});
	const [search,setSearch]     = useState("")
	const [rowId,setRowId]	     = useState('');
	const [isLoad,setIsLoad]     = useState(true);
	const [isOpen,setIsOpen]     = useState(false);
	const [proMode,setproMode]   = useState("ADD");

	useEffect(() => {
		fetchEmployees()
	},[])

	// INITIALLY FETCH APPLICATION INFO
	const fetchEmployees = async () => {
		var response = await getApplication()
		if(response.status === 200){
			setPageinfo(response.data);
			setIsLoad(false)
		}else{
			toast.error('Unable to fetch the data');
		}
	};

	// DELETE APPLICATION
	const deleteJobData = async() =>{
		const response = await deleteApplication(deleteId);
		if (response.status === 200) {
			fetchEmployees();
			toast.success(`${deleteId[0]} deleteed successfully`);
		}else{
			toast.error('Failed to upd employee');
		}
	}

	const openForm=async(pro_for,id)=>{
		if(pro_for === "add"){
			setIsOpen(true)
			setFormData({})
			setproMode("ADD")
		}else
		if(pro_for ==="upd"){
			var response = await getApplicatioinById(id);
			if(response.status === 200){
				console.log(response)
				setFormData(response.data)
				setIsOpen(true)
				setproMode('UPD')
				await setRowId(id)
			}else{
				toast.error('Unable get data');
			}
		}
	}

	// HANDLE ONCHANGE FOR FORM
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
		  ...formData,
		  [name]: value,
		});
	};

    // GET DELETE ID
	const getDeleteId = (id) =>{
		console.log(id)
		setDeleteId(id)
	}

	// ADD & UPD
	const handleFormSubmit = async(e) => {
		e.preventDefault();
		setIsOpen(false);
		// ADD
		if(proMode === "ADD"){
			var response = await addApplication(formData);
			if(response.status === 201){
				// UPDATE TABLE
				fetchEmployees();
				toast.success('Application added successfully');
			}else{
				toast.error('Failed to add Application');
			}
		}else
		if(proMode === "UPD"){ //UPD
			var updResponse = await updateApplication(rowId,formData);
			if (updResponse.status === 200) {
			  // UPDATE LIST
			  fetchEmployees();
			  toast.success('Employee updated successfully');
			}else{
			  toast.error('Failed to upd employee');
			}
		}
	};
	// FILTER
	const onFilter = async(e)=>{
		var value  = e.target.value;
		let result = []
		setSearch(value)
		if(value === ""){
			await fetchEmployees();
		}else{
			pageInfo.map(async(row) =>{
				if(row.status === value.toLowerCase()){
					result.push(row)
					await setPageinfo(result)
				}
			});
		}
	}

	if(isLoad){
		return <p>Loading..</p>
	}else{
		return (
			<div>
				<div className='head'>
					<h3>Job Application</h3>
					<div className='side_action'>
					<input
						type="text"
						placeholder="Search by name..."
						value={search}
						onChange={(e) => onFilter(e)}
						style={{ marginBottom: "10px", padding: "8px", width: "200px",}}
					/>
						<p className='delete' onClick={()=>deleteJobData()}>Delete</p>
						<p className='add' onClick={() => openForm("add")}>Add</p>
					</div>
				</div>
				<div className='content'>
					<ul>
						{pageInfo && pageInfo.map((application) => (
							<li key={application.id} className="list_info">
								 <label>
									<input
										type="checkbox"
										onChange={() => getDeleteId(application.id)}
										style={{ marginRight: "10px" }}
									/>
								</label>
								<div style={{display:"flex",justifyContent:"space-between",gap:"20px",alignItems:"center"}} onClick={()=>openForm("upd",application.id)}>
									<div>
										<h3>{application.title}</h3>
										<h3>{application.company}</h3>
									</div>
									<div>
										<p>{application.dateApplied}</p>
										<p className={`${application.status === "applied" ?  "applied" : application.status === "interviewing" ? "interviewing" : application.status === "rejected" ? "reject" : ""  }`}>{application.status}</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
				<AddApplication 
					isOpen   = {isOpen}
					formData = {formData}
					onChange = {handleInputChange}
					onClose  = {() => setIsOpen(false)}
					onSubmit = {handleFormSubmit}
				/>
			<ToastContainer closeOnClick/>
			</div>
		)
	}
	
}

export default JobApplication
