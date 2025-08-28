import { Input } from '@/components/ui/input'
function UserForm({setName , setEmail , setNote}) {
    
  return (
    <div className= "flex flex-col p-8 gap-3 w-[50%]">
        <div>
            <h2>Name * </h2>
            <Input onChange ={(e) => setName(e.target.value)} className="border border-gray-300 rounded-md p-2" />
        </div>

        <div>
            <h2>Email * </h2>
            <Input onChange ={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md p-2" />
        </div>

        <div>
            <h2>Note * </h2>
            <Input  onChange ={(e) => setNote(e.target.value)} className="border border-gray-300 rounded-md p-2" />
        </div>
        
    </div>
  )
}

export default UserForm
