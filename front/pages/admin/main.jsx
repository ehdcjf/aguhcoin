import Link from "next/link";

const main = () => {
  return (
    <div>
      <div>
        <Link href="/admin/show/election/list">
          <a>
            <h1>투표</h1>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/admin/show/politician">
          <a>
            <h1>정치인</h1>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/admin/show/party">
          <a>
            <h1>정당</h1>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default main;
