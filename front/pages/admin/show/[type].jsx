import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { showRequest } from "../../../components/api/admin";

const show = () => {
  const router = useRouter();
  const { type } = router.query;
  const [list, setList] = useState([]);

  useEffect(async () => {
    if (type != undefined) {
      const data = {
        type: type,
      };
      const result = await showRequest(data);
      setList(result);
    }
  }, [type]);

  const renderList = (list) => {
    return list.map((v, i) => {
      return (
        <tr key={i}>
          <td>{v[`${type}_name`]}</td>
          <td>
            <img src={v[`${type}_image`]} style={{ width: 400, height: 300 }} alt="" />
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div>
        <div>
          <Link href="/admin/create/:[type]" as={`/admin/create/${type}`}>
            {type === "party" ? <a>정당 추가</a> : <a>정치인 추가</a>}
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>이미지</th>
            </tr>
          </thead>
          <tbody>{renderList(list)}</tbody>
        </table>
      </div>
    </>
  );
};

export default show;
