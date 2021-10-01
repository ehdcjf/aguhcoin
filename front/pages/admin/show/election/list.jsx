import Link from "next/link";
import { useEffect, useState } from "react";

import { showRequest } from "../../../../components/api/admin";

const list = () => {
  const type = "vote_title";
  const [list, setList] = useState([]);

  useEffect(async () => {
    const data = {
      type: type,
    };
    const result = await showRequest(data);
    setList(result);
  }, []);

  const renderList = (list) => {
    return list.map((v, i) => {
      return (
        <div key={i}>
          <Link
            href="/admin/create/election/:id"
            as={`/admin/create/election/${v.vote_id}`}
          >
            <h1>{v.title}</h1>
          </Link>
        </div>
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

export default list;
