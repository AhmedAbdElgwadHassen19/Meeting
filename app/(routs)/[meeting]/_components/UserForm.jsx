import { Input } from '@/components/ui/input'

function UserForm({setName , setEmail , setNote}) {
    
  return (
    // التغيير هنا: استخدمنا w-full بشكل أساسي، ثم md:w-[50%] للشاشات الأكبر
    <div className="flex flex-col p-4 md:p-8 gap-3 w-full md:w-[50%]">
        <div>
            <h2 className="font-semibold mb-1">Name *</h2>
            <Input onChange ={(e) => setName(e.target.value)} className="border border-gray-300 rounded-md p-2" />
        </div>

        <div>
            <h2 className="font-semibold mb-1">Email *</h2>
            <Input onChange ={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md p-2" />
        </div>

        <div>
            <h2 className="font-semibold mb-1">Note *</h2>
            <Input  onChange ={(e) => setNote(e.target.value)} className="border border-gray-300 rounded-md p-2" />
        </div>
        
    </div>
  )
}

export default UserForm
