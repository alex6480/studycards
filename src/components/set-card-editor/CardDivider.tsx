import * as React from "react";

interface ICardDividerProps {
    addCard?: (after?: string) => void;
    afterCardId: string;
    discrete: boolean;
}

interface ICardDividerState {
    isActive: boolean;
    isHovered: boolean;
}

export class CardDivider extends React.Component<ICardDividerProps, ICardDividerState> {
    private mouseUpListener = this.mouseUp.bind(this);

    constructor(props: ICardDividerProps) {
        super(props);

        this.state = {
            isActive: false,
            isHovered: false,
        };
    }

    public render() {
        if (this.props.addCard === undefined) {
            return <div className="hr"></div>;
        } else {
            return <div className={"hr " + (this.props.discrete ? "is-discrete" : "")}
                        onMouseDown={this.mouseDown.bind(this)}
                        onMouseEnter={this.mouseEnter.bind(this)}
                        onMouseLeave={this.mouseLeave.bind(this)}
                        onClick={this.addCard.bind(this)}>
                <a className={"button " + (this.props.discrete ? "is-light " : "is-primary ") + this.getStateClasses()}>
                    {this.props.discrete ? "+" : "Add new card"}
                </a>
            </div>;
        }
    }

    private mouseEnter() {
        this.setState({isHovered: true});
    }

    private mouseLeave() {
        this.setState({isHovered: false});
    }

    private mouseDown() {
        this.setState({isActive: true});
        document.addEventListener("mouseup", this.mouseUpListener);
    }

    private mouseUp() {
        this.setState({isActive: false});
        document.removeEventListener("mouseup", this.mouseUpListener);
    }

    private addCard() {
        if (this.props.addCard !== undefined) {
            this.props.addCard(this.props.afterCardId);
        }
    }

    private getStateClasses(): string {
        let output = "";
        if (this.state.isActive) {
            output += "is-active";
        } else if (this.state.isHovered) {
            output += "is-hovered";
        }
        return output;
    }
}
