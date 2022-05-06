const UtilityCompanyList = ({data, loading}) => {
    return(
        <>
        {loading ? <div>Loading...</div> :
        <div className="flex flex-wrap w-full overflow-auto p-4">
            {data.map(company => (
                <div className="w-full p-4 overflow-auto border-2 rounded-md">
                    <div key={company._id}>
                        <h1>{company.name}</h1>
                        <p>{company.description}</p>
                        <p>{company.address}</p>
                        <p>{company.city}, {company.country}</p>
                        <p>{company.phone}</p>
                        <p>{company.email}</p>
                        <p>{company.website}</p>
                    </div>
                </div>
            ))}
            </div>
        }
        </>
    )
}

export default UtilityCompanyList