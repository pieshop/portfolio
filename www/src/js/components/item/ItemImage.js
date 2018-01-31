/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React from 'react';

const ItemImage = ({style, media_path, media_name_3x, media_name_2x, media_name_1x, media_name, alt, is_desktop}) => {
    return (
        <div class={style}>
            <div class="thumbnail">
                {is_desktop ? (
                        <img class="img-fluid img-thumbnail" crossOrigin="anonymous" alt={alt}
                             srcSet={`${media_path}${media_name_3x} 1024w,
                                          ${media_path}${media_name_2x} 768w,
                                          ${media_path}${media_name_1x} 480w`}
                             src={`${media_path}${media_name_1x}`}
                             sizes="
                                    (max-width: 480px)  100vw,
                                    (max-width: 768px)  100vw,
                                    (max-width: 1024px) 100vw,
                                    100vw"
                        />
                    ) : (
                        <img class="img-fluid img-thumbnail" crossOrigin="anonymous" alt={alt}
                             src={`${media_path}${media_name}`}/>
                    )}
            </div>
        </div>
    );
};
export default ItemImage;
