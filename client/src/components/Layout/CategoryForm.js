import React from 'react'

const CategoryForm = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Category Name</label>
                    <input type="text"
                        className="form-control mt-2"
                        id="exampleInputcategory"
                        placeholder="Enter Category"
                        defaultValue={props.name}
                        onChange={e => props.setName(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary mt-4">Create</button>
            </form>

        </>
    )
}

export default CategoryForm;
