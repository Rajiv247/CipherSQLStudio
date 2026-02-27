
import mongoose from "mongoose";

const columnSchema = new mongoose.Schema(
  {
    columnName: String,   
    dataType: String      
  },
  { _id: false }          
);



const tableSchema = new mongoose.Schema(
  {
    tableName: String,       

    columns: [columnSchema],  

    rows: [mongoose.Schema.Types.Mixed] 
   
  },
  { _id: false }
);


const expectedOutputSchema = new mongoose.Schema(
  {
    type: String,   
    value: mongoose.Schema.Types.Mixed  
  },
  { _id: false }
);


const assignmentSchema = new mongoose.Schema(
  {
    title: String,           
    description: String,     
    question: String,        

    sampleTables: [tableSchema],  

    expectedOutput: expectedOutputSchema 
  },
  { timestamps: true }  
);



const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
