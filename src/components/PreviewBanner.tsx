export default function PreviewBanner({ text }: { text: string }) {
    return (
      <div className="bg-blue-50 border border-blue-300 text-blue-800 px-4 py-2 rounded-lg text-sm mt-4">
        <strong>Preview:</strong> {text}
      </div>
    )
}
  