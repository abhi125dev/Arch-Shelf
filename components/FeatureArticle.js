import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFeeds } from '../store/api/dashboardApi';
import { getCompetitions } from '../store/api/competitionApi';

import { notification, Pagination, Spin } from 'antd';

const index = ({ id, type }) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const body = {
      type,
      limit: '4',
    };
    getFeeds({ query: body })
      .then((res) => {
        setResponse(res.data.feedList);
        setLoading(false);
      })
      .catch((err) => {
        if (err && err.status === 400) {
          notification.error({
            message: 'Failed to get resources',
          });
        } else {
          notification.error({
            message: `${err.data.error.message}`,
          });
        }
      });
  }, [id]);

  if (type === 'competitions') {
    useEffect(() => {
      setLoading(true);
      const body = {
        limit: '4',
      };
      getCompetitions({ query: body })
        .then((res) => {
          setResponse(res.data.competitionsList);
          setLoading(false);
        })
        .catch((err) => {
          if (err && err.status === 400) {
            notification.error({
              message: 'Failed to get competitions',
            });
          } else {
            notification.error({
              message: `${err.data.error.message}`,
            });
          }
        });
    }, [id]);
  }

  return (
    <div>
      <div className="featured-articles">
        <div className="title-large">Featured</div>
        {response?.length > 0 ? (
          <div className="featured-block">
            {response
              .filter((data) => data._id !== id)
              ?.map((res) => (
                <Link
                  href={`/${type}/${res?._id}`}
                  className="featured-item-2 w-inline-block"
                >
                  <a className="featured-item w-inline-block">
                    <img
                      src={`${res?.media[0]?.url}`}
                      style={{ width: '100px', height: '80px' }}
                      width={90}
                      sizes="(max-width: 479px) 28vw, (max-width: 767px) 20vw, 90px"
                      // srcSet="images/about-archi-p-500.png 500w, images/about-archi-p-800.png 800w, images/about-archi-p-1080.png 1080w, images/about-archi-p-1600.png 1600w, images/about-archi.png 1728w"
                      alt
                      className="feature-image"
                    />
                    {/* <img
                      src={`${res?.media[0]?.url}`}
                      style={{ width: '100px', height: '80px' }}
                      width={90}
                      sizes="(max-width: 479px) 28vw, (max-width: 767px) 20vw, 90px"
                      // srcSet="images/about-archi-p-500.png 500w, images/about-archi-p-800.png 800w, images/about-archi-p-1080.png 1080w, images/about-archi-p-1600.png 1600w, images/about-archi.png 1728w"
                      alt
                      className="feature-image"
                    /> */}
                    <div
                      className="title-small truncate"
                      style={{ maxWidth: '280px' }}
                    >
                      {res ? res?.title : 'N/A'}
                    </div>
                  </a>
                </Link>
              ))}
          </div>
        ) : (
          'No Blogs found'
        )}
      </div>
    </div>
  );
};

export default index;
