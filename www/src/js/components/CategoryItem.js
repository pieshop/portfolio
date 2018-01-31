/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CategoryItemAward from 'components/CategoryItemAward';

export default class CategoryItem extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        // TweenMax.to(this.item_ref, 0.3, {opacity: 1, delay: 0.02, ease: Power1.easeIn});
        const delay = this.props.index/50;
        TweenMax.to(this.item_ref, 0.3, {opacity: 1, delay:delay, ease: Power1.easeIn});
    }

    // Render using TweenMax
    render() {
        const {id, title, to, client_label, entry_id, client_id, year, thumb_path, is_responsive, is_summary, awards} = this.props;
        const opacity = {opacity: 0};
        return (
            <div class="item__container col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <li ref={(item) => this.item_ref = item } class="list__item--subtle_shadow" style={opacity}>
                    <article id={id}>
                        <Link to={to} class="item__thumbnail" data-entryid={entry_id} data-clientid={client_id} title={title}>
                            <div class="thumb text-center">
                                {is_responsive ? (
                                    <img width="350" height="350" class="img-fluid img-thumbnail" crossOrigin="anonymous" alt={title}
                                         srcSet={thumb_path + 'thumb_2x.jpg 2x,' + thumb_path + 'thumb_1x.jpg 1x'}
                                         src={thumb_path + 'thumb_1x.jpg'}/>
                                ) : (
                                    <img width="350" height="350" class="img-fluid img-thumbnail" crossOrigin="anonymous" alt={title}
                                         src={thumb_path + 'thumb_1x.jpg'}/>
                                )}
                            </div>
                        </Link>

                        <div class="item__decoration text-center">
                            <div class="decoration decoration__left"></div>
                            <div class="decoration decoration__right"></div>
                        </div>

                        <div class="item__caption text-center">
                            <dl class="dl-vertical">
                                <dt class="project-title">{title}</dt>
                                <dd class="client">{client_label}</dd>
                                <dd class="year">
                                    {year}
                                    {awards &&
                                    <span class="item__awards">
                                            {awards.map(this.renderAward)}
                                        </span>
                                    }
                                </dd>
                            </dl>
                        </div>
                    </article>
                </li>
                <div class="entry-spacer"></div>
            </div>
        );
    }
    renderAward(data, index) {
        return <CategoryItemAward
            key={data.id}
            {...data}
            index={index}
        />;
    }
}
