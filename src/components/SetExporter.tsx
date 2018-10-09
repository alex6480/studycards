import * as React from "react";
import IFlashCardSet, { ExportFlashCardSet } from "../lib/flashcard/FlashCardSet";

interface ISetExporterProps {
    set: IFlashCardSet;
    getExportUri: (setId: string) => string;
}

interface ISetExporterState {
    filename: string;
}

export default class SetExporter extends React.Component<ISetExporterProps, ISetExporterState> {
    public constructor(props: ISetExporterProps) {
        super(props);

        this.state = {
            filename: "",
        };
    }

    public render() {
        return <div className="container">
            <h3 className="title is-3">Export Set</h3>
            <p className="subtitle is-4">Exports the set '{this.props.set.name}' into
                a study cards set file (*.scset).</p>
            <div className="box">
                <div className="field">
                    <label className="label">File Name</label>
                    <div className="control has-icons-left">
                        <input className="input" type="text" placeholder="Name of the file"
                            onChange={(e) => this.setState({ filename: e.target.value })}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-file"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <a className="button is-primary" onClick={this.export.bind(this)}>Export</a>
                    </div>
                </div>
            </div>
        </div>;
    }

    private export() {
        const downloadUri = this.props.getExportUri(this.props.set.id);
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href",     downloadUri);
        downloadAnchorNode.setAttribute("download", this.state.filename + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
}
