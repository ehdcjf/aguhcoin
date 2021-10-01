import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { showRequest } from "../../../../components/api/admin";

const view = () => {
  const router = useRouter();
  const { id } = router.query;
  const type = "vote_info";
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
          <td>{v.name}</td>
          <td>
            <img src={v.image} style={{ width: 400, height: 300 }} alt="" />
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div>
        <Link href="/admin/create/election">투표 추가</Link>
      </div>
      <div>{renderList(list)}</div>
    </div>
  );
};

export default view;
