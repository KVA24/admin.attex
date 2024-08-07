import {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'

// Components
import PageBreadcrumb from "@/components/PageBreadcrumb.tsx";

// dummy data
import {records} from './data'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";

const Account = () => {

  const dispatch = useDispatch()
  const data = useSelector((state: RootState) => state)

  useEffect(() => {
    console.log(data)
  }, [dispatch])

  return (
    <>
      <PageBreadcrumb title="Basic" subName="Table"/>
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
        <div className="xl:col-span-2">
          <div className="card">
            <div className="p-6">
              <h3 className="card-title mb-4">Always responsive</h3>

              <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                      <tr>
                        <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                          #
                        </th>
                        <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                          Heading
                        </th>
                        <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                          Heading
                        </th>
                        <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                          Heading
                        </th>
                        <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                          Heading
                        </th>
                        <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                          Heading
                        </th>
                        <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                          Heading
                        </th>
                        <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                          Heading
                        </th>
                        <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                          Heading
                        </th>
                        <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                          Heading
                        </th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {(records || []).slice(0, 3).map((record, idx) => {
                        return (
                          <tr key={idx}>
                            <th scope="col" className="px-4 py-4 text-start text-sm font-medium text-gray-500">
                              {record.id}
                            </th>
                            <td
                              className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">{record.cell}</td>
                            <td
                              className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">{record.cell}</td>
                            <td
                              className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">{record.cell}</td>
                            <td
                              className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">{record.cell}</td>
                            <td
                              className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">{record.cell}</td>
                            <td
                              className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">{record.cell}</td>
                            <td
                              className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">{record.cell}</td>
                            <td
                              className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">{record.cell}</td>
                            <td
                              className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">{record.cell}</td>
                          </tr>
                        )
                      })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account
